class StateBuf {
  constructor(data, offset) {
    this.buf = Buffer.concat(data);
    this.offset = offset || 0;
  }

  readInt8(){
    return this.buf.readInt8(this.offset++);
  }

  readFloatLE(){
    const r = this.buf.readFloatLE(this.offset);
    this.offset += 4;
    return r;
  }

  readInt32LE(){
    const r = this.buf.readInt32LE(this.offset);
    this.offset += 4;
    return r;
  }

  readUInt32LE(){
    const r = this.buf.readUInt32LE(this.offset);
    this.offset += 4;
    return r;
  }

  skip(n) {
    const newOffset = this.offset + n;
    if(newOffset > this.buf.length) throw new Error(`Cannot skip bytes. start: ${this.offset}, offset: ${n}, ${newOffset} > ${this.buf.length}`);
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

  read() {
    return this.offset;
  }
}

module.exports = StateBuf
