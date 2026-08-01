import os
import gradio as gr
from huggingface_hub import InferenceApi

MODEL_ID = "moonshotai/Kimi-K2.7-Code"
API_TOKEN = os.environ.get("HF_TOKEN", None)

inference = InferenceApi(repo_id=MODEL_ID, token=API_TOKEN, task="text-generation")

EXAMPLES = [
    "Write a Python function that reverses a string.",
    "Generate a JavaScript function to fetch JSON data from an API endpoint.",
    "Create a SQL query to find the top 10 customers by order total.",
    "Write a Rust function that computes the factorial of an integer.",
]


def generate_code(prompt: str, max_tokens: int = 256, temperature: float = 0.2):
    if not prompt or prompt.strip() == "":
        return "Please enter a prompt to generate code."

    try:
        output = inference(
            prompt,
            parameters={
                "max_new_tokens": max_tokens,
                "temperature": temperature,
                "top_p": 0.95,
                "repetition_penalty": 1.05,
            },
        )

        if isinstance(output, list) and len(output) > 0 and "generated_text" in output[0]:
            return output[0]["generated_text"].strip()
        if isinstance(output, str):
            return output.strip()

        return "No output from the model."
    except Exception as exc:
        return f"Error: {exc}"


demo = gr.Blocks(title="Kimi K2.7 Code Demo")
with demo:
    gr.Markdown(
        "# Kimi K2.7 Code Demo\n"
        "Generate code snippets with the `moonshotai/Kimi-K2.7-Code` model.\n"
        "\n" 
        "Enter a task request and click **Generate** to see code output." 
    )
    with gr.Row():
        with gr.Column():
            prompt_input = gr.Textbox(
                label="Prompt",
                placeholder="Describe the code you want to generate...",
                lines=5,
                value="Write a Python function that reverses a string.",
            )
            max_tokens = gr.Slider(64, 1024, value=256, step=64, label="Max Tokens")
            temperature = gr.Slider(0.0, 1.0, value=0.2, step=0.05, label="Temperature")
            generate_button = gr.Button("Generate")
        with gr.Column():
            output_area = gr.Textbox(label="Generated Code", lines=18)
    generate_button.click(
        generate_code,
        inputs=[prompt_input, max_tokens, temperature],
        outputs=output_area,
    )
    gr.Examples(
        examples=EXAMPLES,
        inputs=prompt_input,
    )
    gr.Markdown(
        "---\n"
        "**Notes:**\n"
        "- If the model requires an auth token, set `HF_TOKEN` in the Space secrets.\n"
        "- This demo uses the Hugging Face Inference API for `moonshotai/Kimi-K2.7-Code`."
    )

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
