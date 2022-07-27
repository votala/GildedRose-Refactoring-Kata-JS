var {Shop, Item, ShopHelper} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  
  describe("ShopHelper", function() {
    it("increaseInt", function() {
      expect(ShopHelper.increaseInt(10)).toEqual(11);
      expect(ShopHelper.increaseInt(10, 2)).toEqual(12);
      expect(ShopHelper.increaseInt(24, 5)).toEqual(29);
      expect(ShopHelper.increaseInt(49, 2, 50)).toEqual(50);
    });
    it("decreaseInt", function() {
      expect(ShopHelper.decreaseInt(10)).toEqual(9);
      expect(ShopHelper.decreaseInt(10, 2)).toEqual(8);
      expect(ShopHelper.decreaseInt(0, 2, 0)).toEqual(0);
    });
  })

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", -1, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("The Quality of an item is never negative", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 4, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("\"Aged Brie\" actually increases in Quality the older it gets", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
    expect(items[0].sellIn).toEqual(1);
  });

  it("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sellIn).toEqual(1);
  });

  it("\"Sulfuras\", being a legendary item, never has to be sold or decreases in Quality + Quality is 80 and never alters", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 3, 15) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(3);
  });

  describe("\"Backstage passes\"", function() {
      it(", like aged brie, increases in Quality as its SellIn value approaches;", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 25, 44) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(45);
        expect(items[0].sellIn).toEqual(24);
      });

      it(", Quality increases by 2 when there are 10 days or less", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(12);
        expect(items[0].sellIn).toEqual(9);
      });

      it(", Quality increases by 3 when there are 5 days or less", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(13);
        expect(items[0].sellIn).toEqual(4);
      });

      it(", Quality drops to 0 after the concert", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 45) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
        expect(items[0].sellIn).toEqual(-2);
      });
  });


  it("\"Conjured\" items degrade in Quality twice as fast as normal items", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 25, 18) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(16);
    expect(items[0].sellIn).toEqual(24);
  });


});
