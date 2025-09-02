"use server"

interface IpResponse {
    ip: string
}

export default async function getIp() {
    const res = await fetch("https://api.ipify.org?format=json")
    if (!res.ok) throw new Error("Failed to fetch IP address")
    const data: IpResponse = await res.json()
    return data.ip
}
