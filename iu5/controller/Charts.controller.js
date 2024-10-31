sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("charts.controller.Charts", {
    onInit: function () {

    },
    onPress: function () {
      const newBookData = {
        title: "Yeni Kitap Başlığı",
        author_ID: 101,
        stock: 10
      };

      // AJAX isteğiyle kitabı ekleyin
      $.ajax({
        url: "http://localhost:4004/odata/v4/catalog/Books?",  // OData servisin URI yolu
        method: "POST",
        type: "json",
        contentType: "application/json",
        data: JSON.stringify(newBookData),
        success: (response) => {
          debugger
          MessageToast.show("Kitap başarıyla eklendi!");
        },
        error: (xhr, status, error) => {
          debugger
          MessageToast.show("Kitap eklenirken hata oluştu: " + error);
        }
      });
    }


  });
});
