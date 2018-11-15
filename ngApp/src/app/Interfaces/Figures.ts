export class Figure{
  constructor(private _num?: number, private _nom?: string, private _prix?: number, private _univers?: String, private _photo?: String, private _createur?: String) {
  }
  get num(): number {
    return this._num;
  }
  set num(num: number) {
    this._num = num;
  }
  get nom(): string {
    return this._nom;
  }
  set nom(nom: string) {
    this._nom = nom;
  }
  get prix(): number {
    return this._prix;
  }
  set prix(prix: number) {
    this._prix = prix;
  }
  get univers(): String {
    return this._univers;
  }
  set univers(univers: String) {
    this._univers = univers;
  }

  get photo(): String {
    return this._photo;
  }
  set photo(photo: String) {
    this._photo = photo;
  }

  get createur(): String {
    return this._createur;
  }
  set createur(createur: String) {
    this._createur = createur;
  }

}