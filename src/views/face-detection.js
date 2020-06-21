function processImage() {
  const subscriptionKey = 'dda292490b0745f18da8b2bf8ae7e791';

  const uriBase = "https://deteccaoemocao1.cognitiveservices.azure.com/face/v1.0/detect";
  
  const params = {
    returnFaceId: "false",
    returnFaceLandmarks: "false",
    returnFaceAttributes:
    "emotion,age"
  };


  const sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  
  $.ajax({
    url: uriBase + "?" + $.param(params),

    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    data: '{"url": ' + '"' + sourceImageUrl + '"}'
  })

    .done((data) => {
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail((jqXHR, textStatus, errorThrown) => {
      const errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message
          ? jQuery.parseJSON(jqXHR.responseText).message
          : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
}