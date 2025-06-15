// export const formattedDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     })
//   }
export const formattedDate = (date) => {
  if (!date) {
    return "Add Date Of Birth";
  } else {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
};
