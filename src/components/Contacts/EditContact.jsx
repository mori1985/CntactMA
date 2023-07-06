
 
import { useEffect,  useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

import { ContactContext } from "../../context/contactContext";
import { getContact , ReqestForEditContact } from "../../services/contactService";
import { Spinner } from "../";
import {
  PURPLE,
  COMMENT,
  ORANGE,
} from "../../helpers/colors";
import { contactSchema } from "../../validations/contactValidation";


const EditContact = () => {
  const { contactId } = useParams();
  const {
    contacts,
    setContacts,
    setFilteredContacts,
    loading,
    setLoading,
    groups,
  } = useContext(ContactContext);

  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        console.log("contactId:" , contactId);
        console.log("contactData:" , contactData);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const submitForm = async (values) => {
   
    try {
      setLoading(true);
      const { data, status } = await ReqestForEditContact(values, contactId);
      if (status === 201 ) { 
        toast.info(" درخواست ویرایش شما با موفقیت به سرور ارسال شد و پس از تایید مشخصات مخاطب مورد نظر اصلاح خواهد شد      ", { icon: "🚀" });
        setLoading(false);
        navigate("/contacts");
      }
      // else if (contact.id === contact.id ) {
      //   toast.warn("این مخاطب قبلا ویرایش شده است");
      //   navigate("/contacts");

      // }
    } catch (err) {
      console.log("err:" , err);
      console.log("err.status:", err.status);
      setLoading(false);
    }
  };
  //console.log("contact:" , contact);
  //console.log(status)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    درخواست ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                    initialValues={contact}
                    
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    

                  
                  <Form> 
                    <div className="mb-2">
                    "نام و نام خانوادگی":
                    <Field
                        name="fullname"
                        type="text"
                        //value={contact.fullname}
                        //onChange={onContactChange}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                      <ErrorMessage
                          name="fullname"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                      />
                    </div>
                    <div className="mb-2">
                    "شماره  موبایل":
                    <Field
                        name="mobile"
                        type="text"
                        //value={contact.mobile}
                       // onChange={onContactChange}
                        className="form-control"
                        placeholder="شماره  موبایل"
                      />
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        
                        )}
                        />
                    </div>
                   
                    <div className="mb-2">
                    "شماره ای پی فون":
                    <Field
                        name="ipphone"
                        type="text"
                        //value={contact.ipphone}
                        //onChange={onContactChange}
                        className="form-control"
                        placeholder="شماره ای پی فون"
                      />
                      <ErrorMessage
                        name="ipphone"
                        render={(msg) => (
                          <div className="text-denger">{msg}</div>
                        
                        )}
                        />
                    </div>
                    <div className="mb-2">
                    "شماره داخلی":<Field
                        name="dakheli"
                        type="text"
                        //value={contact.dakheli}
                        //onChange={onContactChange}
                        className="form-control"
                        placeholder="شماره داخلی"
                      />
                      <ErrorMessage
                       name="dakheli"
                       render={(msg) => (
                         <div className="text-danger"> {msg}</div>
                       )}
                     />

                    </div>
                    <div className="mb-2">
                    "شماره ثابت":<Field
                        name="sabet"
                        type="text"
                        //value={contact.sabet}
                        //onChange={onContactChange}
                        className="form-control"
                        placeholder="شماره ثابت"
                      />
                      <ErrorMessage
                       name="sabet"
                       render={(msg) => (
                         <div className="text-danger"> {msg}</div>
                       )}
                     />

                    </div>
                    <div className="mb-2">
                    "اداره مربوطه":<Field
                        name="edareh"
                        type="text"
                        //value={contact.edareh}
                        //onChange={onContactChange}
                        className="form-control"
                        placeholder="اداره مربوطه"
                      />
                      <ErrorMessage
                       name="edareh"
                       render={(msg) => (
                         <div className="text-danger"> {msg}</div>
                       )}
                     />

                    </div>
                    <div className="mb-2">
                    "سمت ":<Field
                        name="semat"
                        type="text"
                        //value={contact.semat}
                       // onChange={onContactChange}
                        className="form-control"
                        placeholder="سمت "
                      />
                      <ErrorMessage
                       name="semat"
                       render={(msg) => (
                         <div className="text-danger"> {msg}</div>
                       )}
                     />

                    </div>
                    <div className="mb-2">
                    انتخاب اداره کل :<Field
                        name="group"
                        as="select"
                        className="form-control"
                      >
                        <option value="">انتخاب اداره کل</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                          name="group"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value=" درخواست ویرایش مخاطب"
                        
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt=""
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
          </>
      )}
      
    </>
    
  );
};
export default EditContact;
