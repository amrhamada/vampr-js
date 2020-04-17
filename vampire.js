class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currVamp = this;
    while(currVamp.creator) {
      currVamp = currVamp.creator;
      count ++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  sameLevel(vampire) {
    if (this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (!this.creator) {
      return this;
    }
    if (vampire === this) {
       return this
    }
    if (this.creator === vampire.creator) {
      return this.creator;
    }
    if (this.creator === vampire || vampire.creator === this) {
      return this.creator === vampire ? vampire : this;
    } 
    let junior = this.isMoreSeniorThan(vampire) ? vampire : this;
    let senior = this.isMoreSeniorThan(vampire) ? this: vampire;
    while (junior.creator) {
      if(senior.sameLevel(junior)) {
        while (junior.creator) {
          if ( junior.creator === senior.creator) {
            return junior.creator;
          }
          junior = junior.creator;
          senior = senior.creator;
        }
      }
      junior = junior.creator;
    }
  }
}

module.exports = Vampire;

