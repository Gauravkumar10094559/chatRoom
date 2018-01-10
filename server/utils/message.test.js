var {generateMsg}=require('./message');

describe('generate message',()=>{ 
    it('should generate correct message',()=>{
        var msg={name:'gaurav',text:'top of the morning '};
        var res=generateMsg(msg.name,msg.text);
        console.log('res',res);
        expect(res.from).toBe(msg.name);
        expect(res.text).toBe(msg.text);
        expect(typeof res.createdAt).toBe('number');
    });
});