var {isRealString} = require('./validation');

describe('is real string',() => {
    it('should reject non string values',()=>{
        var fakeString=123;
        var result=isRealString(fakeString);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces',()=>{
        var noValueString='    ';
        var result=isRealString(noValueString);
        expect(result).toBe(false);
    });

    it('should allow string with non-space characters',()=>{
        var validString='gaurav kumar';
        var result=isRealString(validString);
        expect(result).toBe(true);
    })
})