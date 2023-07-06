import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";
//import { contactSchema } from "./validations/contactValidation";

import { ContactContext } from "./context/contactContext";
import {
  AddContact,
  ViewContact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import "./App.css";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  //const [contact, setContact] = useImmer({});
  //const [errors, setErrors] = useImmer([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (values) => {
    //event.preventDefault();
    try {
      setLoading((draft) => !draft);
      //await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);
      
        

      /*
       * NOTE
       * 1- Rerender -> forceRender, setForceRender
       * 2- setContact(data)
       */

      if (status === 201) {
        toast.success(" درخواست شما با موفقیت به سرور ارسال شد و پس از تایید به لیست مخاطبین اضافه خواهد شد ", { icon: "🚀" });
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });

        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      //setErrors(err.inner);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const contactsBackup = [...contacts];
    try {
      setContacts((draft) => contacts.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) =>
        contacts.filter((c) => c.id !== contactId)
      );

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
    }
  };

  let filterTimeout;
  const contactSearch = (query) => {
    if (!query) return setFilteredContacts([...contacts]);

    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setFilteredContacts((draft) =>
        draft.filter((draft) => {
          return draft.semat.toLowerCase().includes(query.toLowerCase())      ||
                  draft.fullname.toLowerCase().includes(query.toLowerCase())  ||
                  draft.ipphone.toLowerCase().includes(query.toLowerCase())   || 
                  draft.edareh.toLowerCase().includes(query.toLowerCase())    || 
                  draft.mobile.toLowerCase().includes(query.toLowerCase())    ||
                  draft.dakheli.toLowerCase().includes(query.toLowerCase())   ||
                  draft.sabet.toLowerCase().includes(query.toLowerCase());    
        })
      );
    }, 500);
  };


  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        //contact,
        setContacts,
        setFilteredContacts,
        contacts,
        filteredContacts,
        groups,
        //onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        //errors,
        
      }}
    >
      <div className="App">
      <ToastContainer rtl={true} position="top-center" theme="colored" autoClose={15000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
