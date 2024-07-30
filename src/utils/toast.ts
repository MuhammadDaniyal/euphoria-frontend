import toast from "react-hot-toast";

export const succesToastify = (message: string) =>
  toast.success(message, {
    style: {
      border: "1px solid #d4efec",
      padding: "16px",
      color: "#00a28e",
      backgroundColor: "#f0f9f8",
      marginTop: "25px",
      marginRight: "30px",
    },
    iconTheme: {
      primary: "#00a28e",
      secondary: "#eaf7f5",
    },
  });

export const errorToastify = (message: string) =>
  toast.error(message, {
    style: {
      border: "1px solid #ffe1e1",
      padding: "16px",
      color: "#ff4c4c",
      backgroundColor: "#fff6f6",
      marginTop: "25px",
      marginRight: "30px",
    },
    iconTheme: {
      primary: "#ff4c4c",
      secondary: "#fff6f6",
    },
  });
