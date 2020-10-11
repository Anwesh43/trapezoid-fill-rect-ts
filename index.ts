const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 3.9 
const delay : number = 20 
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#F44336",
    "#009688",
    "#FF5722",
    "#4CAF50",
    "#2196F3"
] 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawTrapezoidFillPath(context : CanvasRenderingContext2D, size : number, scale : number) {
        context.beginPath()
        context.moveTo(-size / 2, 0)
        context.lineTo(-size / 4, -size / 2)
        context.lineTo(size / 4, -size / 2)
        context.lineTo(size /2, 0)
        context.lineTo(-size / 2, 0)
        context.clip()
        context.fillRect(-size / 2, -size * 0.5 * scale, size, size * 0.5 * scale)
    }

    static drawTrapezoidFill(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1 , parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        context.save()
        context.translate(w / 2, h)
        DrawingUtil.drawLine(context, -size / 2, 0, -size / 4, -size / 2)
        DrawingUtil.drawLine(context, -size / 4, -size / 2, size / 4, -size / 2)
        DrawingUtil.drawLine(context, size / 4, -size / 2, 0, size / 2)
        DrawingUtil.drawTrapezoidFillPath(context, size, scale)
        context.restore()
    }

    static drawTFNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.fillStyle = colors[i] 
        context.strokeStyle = colors[i]
        DrawingUtil.drawTrapezoidFill(context, scale)
    }
}