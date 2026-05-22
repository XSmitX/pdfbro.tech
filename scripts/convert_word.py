"""
Word to PDF converter using docx2pdf (Microsoft Word COM API on Windows).
Called by the Next.js API route via child_process.

Usage:
  python convert_word.py <input_file> <output_file>

Exit codes:
  0 - success
  1 - error (message printed to stderr)
"""

import sys
import os
import tempfile

def convert_word_to_pdf(input_path: str, output_path: str) -> None:
    try:
        from docx2pdf import convert
        convert(input_path, output_path)
    except ImportError:
        raise RuntimeError("docx2pdf not installed. Run: pip install docx2pdf")
    except Exception as e:
        raise RuntimeError(f"Conversion failed: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_word.py <input_file> <output_file>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        convert_word_to_pdf(input_file, output_file)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        else:
            print("Conversion produced no output file", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
