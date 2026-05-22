import sys
import os

def convert(input_path, output_path):
    try:
        import win32com.client
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        doc = word.Documents.Open(os.path.abspath(input_path))
        # 10 = wdFormatFilteredHTML
        doc.SaveAs2(os.path.abspath(output_path), FileFormat=10)
        doc.Close()
        word.Quit()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_word_to_html.py <input> <output>", file=sys.stderr)
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
