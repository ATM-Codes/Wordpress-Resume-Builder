import moveItem from './moveItem';

describe('moveItem',()=>{
    it('moves and item down one place',()=>{
        expect(moveItem(['a','b','c'],0,1)).toEqual(['b','a','c']);
    })
    it('moves and item up one place',()=>{
        expect(moveItem(['a','b','c'],1,0)).toEqual(['b','a','c']);
    })
    it('moving the first item up and getting the same list',()=>{
        const list =['a','b','c']
        expect(moveItem(list,0,-1)).toBe(list);
    })
    it('moving the last item down and getting the same list',()=>{
        const list =['a','b','c']
        expect(moveItem(list,2,3)).toBe(list);
    })
    it('Original array not being changed',()=>{
        const original = ['a','b','c']
        moveItem(original,0,2);
        expect(original).toEqual(['a','b','c']);
    })
});
