const {Users} =require('./users.js');

describe('Users',()=> {

    var users;

    beforeEach(()=> {
        users=new Users();
        users.users=[
            {
                id:'1',
                name:'gaurav',
                room:'node'
            },
            {
                id:'2',
                name:'karthik',
                room:'react'
            },
            {
                id:'3',
                name:'yoyo',
                room:'node'
            }
        ];

    });


    it('should add a new user',()=> {
        var users=new Users();
        var user={
            id:'111',
            name:'gaurav',
            room:'the forlorners'
        };
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });




    it('should remove a user',() => {
        var userId='1';
        var user=users.removeUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not remove a user',() => {
        var userId='22';
        var user=users.removeUser(userId);
        expect(user).toBeUndefined();
    });

    it('should find a user',() => {
        var userId='2';
        var user=users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user',() => {
        var userId='22';
        var user=users.getUser(userId);
        expect(user).toBeUndefined();
    });









    it('should return names for node courses',()=> {
        var userList=users.getUserList('node');
        expect(userList).toEqual(['gaurav','yoyo']);
    });


    it('should return names for react courses',()=> {
        var userList=users.getUserList('react');
        expect(userList).toEqual(['karthik']);
    });
});