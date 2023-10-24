import {v4 as uuidv4} from 'uuid';

export class Utils {
  static convertPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  static getPriceAfterDiscMember = (price:number, discount:number) =>{
    return (price - (price * (discount/100)));
  }

  static generateUUID = () => {
    const uuid = uuidv4()
    return uuid;
  }

  static createdAt = () =>{
    const month = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    return date

  }

  static getStartTime = (d:Date) => {
    const localeString = d.toLocaleTimeString('US-id')
    return localeString
  }

  static getDateAndTime = (d:string) =>{
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(d);

    let result = ""
    const day = days[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const time = date.toLocaleTimeString('US-id')
    result += (day + " " + month + " " + year+ ", " + time )
    return result
  }

  static decodeJWT = (token:string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload
    } catch (error)  {
      return null
    }
  }
}
