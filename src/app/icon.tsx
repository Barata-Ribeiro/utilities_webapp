import { ImageResponse } from "next/og"

export const SIZE = {
    width: 192,
    height: 192,
}

export const contentType = "image/png"

export default function Icon() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" clip-rule="evenodd" viewBox="0 0 512 512">
  <path fill="#e64919" d="M512 122.18v267.64C512 457.253 457.253 512 389.82 512H122.18C54.747 512 0 457.253 0 389.82V122.18C0 54.747 54.747 0 122.18 0h267.64C457.253 0 512 54.747 512 122.18Z"/>
  <path fill="none" stroke="#fafafa" stroke-width="35" d="m238.49 225.7225-70-121.275M238.49 286.2725l-70 121.275M255.99 430.9975v-35M255.99 80.9975v35M290.99 255.9975h140M343.49 407.5475l-17.5-30.275M343.49 104.4475l-17.5 30.275M80.99 255.9975h35M407.54 343.4975l-30.275-17.5M407.54 168.4975l-30.275 17.5M104.44 343.4975l30.275-17.5M104.44 168.4975l30.275 17.5"/>
  <circle cx="12" cy="12" r="2" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(17.5 0 0 17.5 45.99 45.9975)"/>
  <circle cx="12" cy="12" r="8" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(17.5 0 0 17.5 45.99 45.9975)"/>
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
