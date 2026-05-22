"""GIF to MP4 converter using moviepy.

Usage:
  python convert_gif_to_mp4.py <input.gif> <output.mp4>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import os
import sys


def convert_gif_to_mp4(input_path: str, output_path: str) -> None:
    try:
        from moviepy import VideoFileClip

        clip = VideoFileClip(input_path)
        clip.write_videofile(
            output_path,
            codec="libx264",
            audio=False,
            logger=None,
            fps=clip.fps or 12,
            ffmpeg_params=["-pix_fmt", "yuv420p"],
        )
        clip.close()
        # Ensure data is fully flushed before downstream reads.
        if os.path.exists(output_path):
            with open(output_path, "rb"):
                pass
    except ImportError:
        raise RuntimeError("moviepy not installed. Run: pip install moviepy imageio-ffmpeg")
    except Exception as e:
        raise RuntimeError(f"Conversion failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_gif_to_mp4.py <input.gif> <output.mp4>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        convert_gif_to_mp4(input_file, output_file)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        print("Conversion produced no output file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
