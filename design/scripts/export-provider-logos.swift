// Rasterizes the provider logo SVGs (design/assets/masters/provider-logos/) to transparent
// 96 x 96 PNGs in assets/images/login/. macOS only (uses AppKit's SVG support).
// Run from the app root:  swift design/scripts/export-provider-logos.swift
import AppKit

let size = 96
let fill: CGFloat = 0.92 // glyph fills 92% of the square; leaves a little padding
let logos = [
    ("google-g-official-v01", "provider-google-v01"),
    ("apple-white-v01", "provider-apple-v01"),
    ("facebook-f-lime-v01", "provider-facebook-v01"),
]

for (source, output) in logos {
    let sourcePath = "design/assets/masters/provider-logos/\(source).svg"
    guard let image = NSImage(contentsOfFile: sourcePath) else {
        print("Could not load \(sourcePath)")
        exit(1)
    }
    let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8,
        samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB,
        bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
    NSGraphicsContext.current?.imageInterpolation = .high
    let scale = CGFloat(size) * fill / max(image.size.width, image.size.height)
    let width = image.size.width * scale
    let height = image.size.height * scale
    image.draw(in: NSRect(x: (CGFloat(size) - width) / 2, y: (CGFloat(size) - height) / 2, width: width, height: height))
    NSGraphicsContext.restoreGraphicsState()
    let outputPath = "assets/images/login/\(output).png"
    try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: outputPath))
    print("Wrote \(outputPath)")
}
