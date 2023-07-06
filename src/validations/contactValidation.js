import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  mobile: Yup.string().required("شماره موبایل الزامی می باشد"),
  ipphone: Yup.string().nullable(),
  dakheli: Yup.string().nullable(),
  sabet: Yup.string().nullable(),
  semat: Yup.string().required("سمت الزامی میباشد"),
  edareh: Yup.string().required("اداره الزامی میباشد"),
  group: Yup.string().required("انتخاب گروه الزامی می باشد"),
  // email: Yup.string().email("آدرس ایمیل معتبر نیست")
  // photo: Yup.string()
  //   .url("آدرس معتبر نیست")
  //   .required("تصویر مخاطب الزامی می باشد"),
});
