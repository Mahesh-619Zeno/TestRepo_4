# This runs during container build time to download model weights into the
# container.

import os
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

def download_weights():
    name = os.environ.get("MODEL_NAME", "Rallio67/joi_20B_instruct_alpha")

    print("[DEBUG]: downloading model: " + name)

    try:
        AutoModelForCausalLM.from_pretrained(name, device_map='auto')
    except Exception as e:
        print(f"[ERROR]: Failed to download model weights: {e}")
        exit(1)

    print("[DEBUG]: downloading tokenizer")

    AutoTokenizer.from_pretrained(name)
    
    print("[DEBUG]: add done")
    
if __name__ == "__main__":
    download_weights()