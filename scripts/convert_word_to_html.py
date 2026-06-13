"""
Word to HTML converter.

NOTE: This script requires Microsoft Word (Windows-only).
On Linux, use LibreOffice instead:
  libreoffice --headless --convert-to html <input.docx>

Usage:
  python convert_word_to_html.py <input.docx> <output.html>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os

def convert_docx_to_html(input_path: str, output_path: str) -> None:
    """Convert DOCX to HTML using Microsoft Word COM API (Windows only)."""
    if sys.platform != "win32":
        raise RuntimeError(
            "Word to HTML conversion with Microsoft Word is only available on Windows. "
            "On Linux, use LibreOffice: libreoffice --headless --convert-to html <input.docx>"
        )

    try:
        import win32com.client

        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        try:
            doc = word.Documents.Open(os.path.abspath(input_path))
            # 10 = wdFormatFilteredHTML
            doc.SaveAs2(os.path.abspath(output_path), FileFormat=10)
            doc.Close()
        finally:
            word.Quit()
    except ImportError:
        raise RuntimeError(
            "pywin32 not installed. Run: pip install pywin32"
        )
    except Exception as e:
        raise RuntimeError(f"Conversion failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_word_to_html.py <input.docx> <output.html>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        convert_docx_to_html(input_file, output_file)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        print("Conversion produced no output file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
