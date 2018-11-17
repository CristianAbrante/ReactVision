
const DEFAULT_POSITION = 0;

class ProcessedImage {
    image;
    imageData;
    context;
    canvas;
    x = DEFAULT_POSITION;
    y = DEFAULT_POSITION;

    constructor(image, x, y) {
        if (image === undefined) {
            throw new Error("Image could not be undefined");
        } else {
            this.image = image;
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();
            this.context = this.canvas.getContext('2d');
            this.context.drawImage(this.image, 0, 0);
            this.setPosition(x, y);
        }
    }

    getSrc() {
        return this.image.src;
    }

    setSrc(src) {
        if (this.image.src !== undefined) {
            this.image.src = src;
        } else {
            throw new Error("image source could not be undefined.");
        }
    }

    getWidth() {
        return this.image.width;
    }

    getHeight() {
        return this.image.height;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x !== undefined ? x : DEFAULT_POSITION;
        this.setImageData();
    }

    setY(y) {
        this.y = y !== undefined ? y : DEFAULT_POSITION;
        this.setImageData();
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setImageData() {
        this.imageData =
            this.context.getImageData(
                this.getX(),
                this.getY(),
                this.getWidth(),
                this.getHeight());
    }

    draw(canvas) {
        canvas.getContext('2d').putImageData(
            this.imageData,
            this.getX(),
            this.getY());
    }

    indexesAreInRange(i, j) {
        return (i >= 0 && i < this.getHeigth())
            && (j >= 0 && j < this.getWidth());
    }

    colorIsInRange(color) {
        return color >= 0 && color <= 255;
    }

    getColorIndex(i, j) {
        if (this.indexesAreInRange(i, j)) {
            return j * (this.getWidth() * 4) + i * 4;
        } else {
            return undefined;
        }
    }

    getColor(i, j, component) {
        const index = this.getColorIndex(i, j) + component;
        if (index !== undefined) {
            return this.imageData.data[index];
        } else {
            throw new Error('indexes are not in range');
        }
    }

    setColor(i, j, component, color) {
        if (this.colorIsInRange(color)) {
            const index = this.getColorIndex(i, j) + component;
            if (index !== undefined) {
                this.imageData.data[index] = color;
            } else {
                throw new Error('indexes are not in range');
            }
        } else {
            throw new Error('color is not in range: ' + color);
        }
    }

    getRedComponent(i, j) {
        return this.getColor(i, j, 0);
    }

    setRedComponent(i, j, red) {
        this.setColor(i, j, 0, red);
    }

    getGreenComponent(i, j) {
        return this.getColor(i, j, 1);
    }

    setGreenComponent(i, j, green) {
        this.setColor(i, j, 1, green);
    }

    getBlueComponent(i, j) {
        return this.getColor(i, j, 2);
    }

    setBlueComponent(i, j, blue) {
        this.setColor(i, j, 2, blue);
    }

    getAlphaComponent(i, j) {
        return this.getColor(i, j, 3);
    }

    setAlphaComponent(i, j, alpha) {
        this.setColor(i, j, 3, alpha);
    }

    getRGBComponents(i, j) {
        return [
            this.getRedComponent(i, j),
            this.getGreenComponent(i, j),
            this.getBlueComponent(i, j)
        ]
    }

    setRGBComponents(i, j, red, green, blue) {
        this.setRedComponent(i, j, red);
        this.setGreenComponent(i, j, green);
        this.setBlueComponent(i, j, blue);
    }

    getRGBAComponents(i, j) {
        return this.getRGBComponents(i, j)
            + [this.getAlphaComponent(i, j)];
    }

    setRGBAComponets(i, j, red, green, blue, alpha) {
        this.setRGBComponents(i, j, red, green, blue);
        this.setAlphaComponent(i, j, alpha);
    }
}

export default ProcessedImage;