const rewire = require("rewire")
const WriteButton = rewire("./WriteButton")
const runTiming = WriteButton.__get__("runTiming")
// @ponicode
describe("runTiming", () => {
    test("0", () => {
        let callFunction = () => {
            runTiming("2017-09-29T19:01:00.000", "Dillenberg", "/PDFData/rothfuss/data/UCF101/prepared_videos")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            runTiming("2017-09-29T23:01:00.000Z", "Dillenberg", "/PDFData/rothfuss/data/UCF101/prepared_videos")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            runTiming("Mon Aug 03 12:45:00", "elio@example.com", "/PDFData/rothfuss/data/UCF101/prepared_videos")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            runTiming("01:04:03", "Dillenberg", "/PDFData/rothfuss/data/UCF101/prepared_videos")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            runTiming("Mon Aug 03 12:45:00", "Dillenberg", "/PDFData/rothfuss/data/UCF101/prepared_videos")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            runTiming(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
