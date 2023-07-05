import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Pet } from "../../types/pets";

interface PetProps {
  pet: Pet;
}

const CustomImage: React.FC<PetProps> = ({ pet }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [showImage, setShowImage] = useState(false);

  const dateFormat = (date: any) => {
    const deleteTimestamp = date?.split("T")[0];
    const day = deleteTimestamp.split("-")[2];
    const month = deleteTimestamp.split("-")[1];
    const year = deleteTimestamp.split("-")[0];

    return `${day}/${month}/${year}`;
  };

  const exportImage = () => {
    setShowImage(true);
    if (imageRef.current) {
      html2canvas(imageRef.current).then((canvas) => {
        const dataURL = canvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "custom-image.jpg";
        downloadLink.click();
        setShowImage(false);
      });
    }
  };

  return (
    <div>
      <button onClick={exportImage}>Certidão Pet</button>
      {showImage ? (
        <div
          ref={imageRef}
          style={{ position: "relative", padding: "0px", marginTop: "10px" }}
        >
          <img src="/src/assets/certidao.jpg" alt="Imagem Personalizada" />
          <span
            style={{
              position: "absolute",
              top: "21.1rem",
              left: "7.7rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {pet.name}
          </span>
          <span
            style={{
              position: "absolute",
              top: "23.8rem",
              left: "7.7rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {pet.animalType}
          </span>
          <span
            style={{
              position: "absolute",
              top: "27rem",
              left: "7.7rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {`${pet.weight} Kgs`}
          </span>
          <span
            style={{
              position: "absolute",
              top: "29.9rem",
              left: "8.2rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {pet.gender}
          </span>
          <span
            style={{
              position: "absolute",
              top: "23.8rem",
              left: "27.6rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {dateFormat(pet?.birthDate)}
          </span>
          <span
            style={{
              position: "absolute",
              top: "27rem",
              left: "23.6rem",
              color: "black",
              fontSize: "15px",
            }}
          >
            {pet.breed}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomImage;
