export function EncodedUInt64ToString(bytes) {
    const digits = []
    bytes.forEach((byte, j) => {
        for (let i = 0; byte > 0 || i < digits.length; i++) {
            byte += (digits[i] || 0) * 0x100
            digits[i] = byte % 10
            byte = (byte - digits[i]) / 10
        }
    })
    return digits.reverse().join('')
}
