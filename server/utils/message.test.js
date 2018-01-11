var {generateMsg,generateLocationMsg}=require('./message');

describe('generate message',()=>{ 
    it('should generate correct message',()=>{
        var msg={name:'gaurav',text:'top of the morning '};
        var res=generateMsg(msg.name,msg.text);
        // console.log('res',res);
        expect(res.from).toBe(msg.name);
        expect(res.text).toBe(msg.text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage',()=> {
    it('should generate correct location object',()=>{
        var locationMsg={
            from:"Admin",
            lat:1,
            lon:1
        };
        var res=generateLocationMsg(locationMsg.from,locationMsg.lat,locationMsg.lon);

        expect(res.from).toBe(locationMsg.from);
        expect(res.url).toBe(`https://www.google.com/maps?q=${locationMsg.lat},${locationMsg.lon}`);
        expect(typeof res.createdAt).toBe('number');
    })
})