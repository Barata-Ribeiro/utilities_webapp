import { ImageResponse } from "next/og"

export const SIZE = {
    width: 512,
    height: 512,
}

export const contentType = "image/png"

export default function AppleIcon() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" clip-rule="evenodd" viewBox="0 0 64 64">
  <path fill="#e64919" d="M64 16v32c0 8.831-7.169 16-16 16H16C7.169 64 0 56.831 0 48V16C0 7.169 7.169 0 16 0h32c8.831 0 16 7.169 16 16Z"/>
  <path fill="none" stroke="#fafafa" stroke-width="4.5" d="m29.75 28.1075-9-15.5925m9 23.3775-9 15.5925M32 54.5V50m0-40.5V14m4.5 18h18M43.25 51.485 41 47.5925m2.25-35.0775L41 16.4075M9.5 32H14m37.485 11.25L47.5925 41m3.8925-20.25L47.5925 23M12.515 43.25 16.4075 41M12.515 20.75 16.4075 23"/>
  <circle cx="12" cy="12" r="2" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(2.25 0 0 2.25 5 5)"/>
  <circle cx="12" cy="12" r="8" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(2.25 0 0 2.25 5 5)"/>
</svg>`

    return new ImageResponse(
        (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={`data:image/svg+xml,${encodeURIComponent(svg)}`}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                }}
                width={SIZE.width}
                height={SIZE.height}
                alt="favicon"
            />
        ),
        { ...SIZE },
    )
}
