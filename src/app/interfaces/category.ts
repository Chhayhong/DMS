// export interface ICategory {
//     category:string;
//     wat:string;
//     name:string;
//     village:string;
//     district:string;
//     commune:string;
//     province:string;
//     createBy:any;
//     createDate:Date;
//     key:string;
// }
export interface ICategory {
    wat?:string;
    village?:string;
    district?: any;
    commune?: any;
    province?:any;
    createBy:any;
    createDate:Date;
    key:string;
  }
  