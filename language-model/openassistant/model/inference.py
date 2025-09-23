# For more info, see my notes here:
# https://github.com/cedrickchee/chatgpt-universe#open-source-chatgpt

import logging
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MAX_NEW_TOKENS = 500

def init():
    global model
    global tokenizer

    name = "Rallio67/joi_20B_instruct_alpha"

    try:
        model = AutoModelForCausalLM.from_pretrained(
            name,
            device_map='auto',
            load_in_8bit=True
        )
        tokenizer = AutoTokenizer.from_pretrained(name)
    except Exception as exception:
        logging.error(f"Failed to load model or tokenizer from '{name}': {exception}")
        model = None
        tokenizer = None

def inference(model_inputs:dict) -> dict:
    global model
    global tokenizer

    prompt = model_inputs.get('prompt', None)
    if prompt == None:
        return {'message': "Prompt must be provided"}

    encoded_input = tokenizer(prompt, return_tensors='pt')
    output_sequences = model.generate(
        input_ids=encoded_input['input_ids'].to(model.device),
        do_sample=True,
        max_new_tokens=MAX_NEW_TOKENS,
        num_return_sequences=1,
        top_p=0.95,
        temperature=0.5,
        penalty_alpha=0.6,
        top_k=4,
        return_dict_in_generate=True,
        repetition_penalty=1.03,
        eos_token_id=tokenizer.eos_token_id,
        use_cache=True
        )
    generated_sequences = output_sequences.sequences[:, encoded_input['input_ids'].shape[-1]:]

    output_text = tokenizer.decode(generated_sequences[0], skip_special_tokens=True)
    inference_output = {"output": output_text}
    
    return inference_output

if __name__ == "__main__":
    init()
    model_inputs = {'prompt': 'Who is the first human to step on the moon? \n\nJoi:'}
    print(inference(model_inputs))