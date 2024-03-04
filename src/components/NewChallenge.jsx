import { useContext, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  const [scope, animate] = useAnimate();

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0], border: "1px solid red" },
        { type: "spring", duration: .5, delay: stagger(.04) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.6 } } }}
        >
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.p
              variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ type: "spring" }}
              exit={{ y: 0, opacity: 1 }}
            >
              <label htmlFor="title">Title</label>
              <input ref={title} type="text" name="title" id="title" />
            </motion.p>

            <motion.p
              variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ type: "spring" }}
              exit={{ y: 0, opacity: 1 }}
            >
              <label htmlFor="description">Description</label>
              <textarea ref={description} name="description" id="description" />
            </motion.p>

            <motion.p
              variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ type: "spring" }}
              exit={{ y: 0, opacity: 1 }}
            >
              <label htmlFor="deadline">Deadline</label>
              <input ref={deadline} type="date" name="deadline" id="deadline" />
            </motion.p>
          </motion.div>

          <motion.ul
            id="new-challenge-images"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {images.map((image) => (
              <motion.li
                key={image.alt}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                  },
                }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                onClick={() => handleSelectImage(image)}
                className={selectedImage === image ? "selected" : undefined}
              >
                <img {...image} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
