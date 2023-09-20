export function createPing(device_id: string, header: string, footer: string) {
    const pingType = '01'
    const data = '50494E47'
    return (header + device_id + pingType + data + footer)
}