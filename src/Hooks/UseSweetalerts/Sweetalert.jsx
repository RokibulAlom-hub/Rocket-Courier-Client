import Swal from "sweetalert2";

export const Sweetalert = (title,text,type) => {
    Swal.fire({
        title: title,
        text: text,
        icon: type
      });
};

