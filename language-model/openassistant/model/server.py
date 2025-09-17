#
# HTTP server
#

from sanic import Sanic, response
import subprocess
import inference
import asyncio

# Load the model to GPU on server startup
inference.init()

server = Sanic("oa_inference")

# Healthchecks verify that the environment is correct on AWS container
@server.route('/healthcheck', methods=["GET"])
async def healthcheck(request):
    try:
        proc = await asyncio.create_subprocess_shell(
            'nvidia-smi',
            stdout=asyncio.subprocess.DEVNULL,
            stderr=asyncio.subprocess.DEVNULL
        )
        returncode = await proc.wait()
        gpu = returncode == 0
    except Exception as e:
        gpu = False

    return response.json({"state": "healthy", "gpu": gpu})

# Inference handler at '/'
@server.route('/', methods=["POST"])
async def handle_inference(request):
    model_inputs = request.json

    # Run the blocking inference call in a thread pool
    loop = asyncio.get_event_loop()
    output = await loop.run_in_executor(None, inference.inference, model_inputs)

    return response.json(output)


if __name__ == '__main__':
    server.run(host='0.0.0.0', port=3000, workers=1)
