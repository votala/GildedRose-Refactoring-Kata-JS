class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }

  #itemTypes = {
    brie : "Aged Brie",
    backstage : "Backstage passes to a TAFKAL80ETC concert",
    conjured : "Conjured Mana Cake",
    sulfuras : "Sulfuras, Hand of Ragnaros",
    exilir : "Elixir of the Mongoose",
    vest: "+5 Dexterity Vest",
  }

  updateQuality() {
    this.items.forEach(item => {
      let letSell=true;
      switch (item.name) {
        case this.#itemTypes.brie:
          item.quality = ShopHelper.increaseInt(item.quality);
          break;
        case this.#itemTypes.backstage:
          
          item.quality = 
            item.sellIn < 0 ? 0 : // if sellIn < 0, quality = 0
            ShopHelper.increaseInt(
              item.quality,
              item.sellIn > 10 ? 1 : // +1 quality for each day until 10 days left
              item.sellIn > 5 ? 2 : 3 // +2 quality for each day until 5 days left
            );
          break;
        case this.#itemTypes.sulfuras: 
          item.quality = 80; // Sulfuras never alters
          letSell = false;
          break;
        case this.#itemTypes.conjured:
          item.quality = ShopHelper.decreaseInt(item.quality, 2, 0);
          break;
        default:
          item.quality = ShopHelper.decreaseInt(item.quality, item.sellIn < 0 ? 2 : 1 , 0);
          break;
      }

      if(letSell){
        item.sellIn = ShopHelper.decreaseInt(item.sellIn, 1);
      } //? else "does sellIn should reset to 0"???

    });
    return this.items;
  }
}

const ShopHelper = {

  increaseInt : (num, by=1, max=50) => {
    let result = by;
    if(Number.isInteger(num)){
      result = num + by;
      result = result <= max ? result : max;
    }
    return result;
  },

  decreaseInt : (num, by=1, min=undefined) => {
    let result = 0;
    if(Number.isInteger(num)){
      result = num - by;
      if (min !== undefined){
        result = result < min ? min : result;
      };
    }
    return result;
  }
}
module.exports = {
  Item,
  Shop,
  ShopHelper
}
