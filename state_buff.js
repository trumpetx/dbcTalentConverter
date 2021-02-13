class StateBuf {
  constructor(data, offset) {
    this.buf = Buffer.concat(data);
    this.offset = offset || 0;
  }

  readInt8(){
    return this.buf.readInt8(this.offset++);
  }

  readUInt32LE(){
    const r = this.buf.readUInt32LE(this.offset);
    this.offset += 4;
    return r;
  }

  skip(n) {
    const newOffset = this.offset + n;
    if(newOffset > this.buf.length) throw 'Error: OUT OF BOUNDS';
    this.offset = newOffset;
  }

  toString() {
    return this.buf.toString();
  }

  remainingToString() {
    return this.buf.toString(undefined, this.offset);
  }

  remaining() {
    return this.buf.length - this.offset;
  }
}

module.exports = StateBuf
