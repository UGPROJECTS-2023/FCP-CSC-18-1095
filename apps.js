const chatBody = document.querySelector(".chat-body");
    const txtInput = document.querySelector("#txtInput");
    const send = document.querySelector(".send");

    send.addEventListener("click", () => renderUserMessage());

    txtInput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        renderUserMessage();
      }
    });

    const renderUserMessage = () => {
      const userInput = txtInput.value;
      renderMessageEle(userInput, "user");
      txtInput.value = "";
      setTimeout(() => {
        renderChatbotResponse(userInput);
        setScrollPosition();
      }, 800);
    };

    const renderChatbotResponse = async (userInput) => {
      const res = await getChatbotResponse(userInput);
      renderMessageEle(res);
    };

    const getChatbotResponse = async (userInput) => {
      const lowerCaseInput = userInput.toLowerCase();

      // Check for specific phrase in the user input
      if (lowerCaseInput.includes('hello')) {
        return "Hey! How are you doing?";
      } else if (lowerCaseInput.includes('hey')) {
        return "Hello! How can I assist you today?";
      } else if (lowerCaseInput.includes('new student registration')) {
        return "Monday 22nd January, 2024 to Saturday 3rd February, 2024";
      } else if (lowerCaseInput.includes('registration for new student')) {
        return "Monday 22nd January, 2024 to Saturday 3rd February, 2024";
      } else if (lowerCaseInput.includes('continuation for registration for new students')) {
        return " Monday 29th January, 2024 to Saturday 10th February, 2024";
      } else if (lowerCaseInput.includes('late registration')) {
        return "Monday 12th February, 2024 to Saturday 17th February, 2024";
      } else if (lowerCaseInput.includes('commencement of registration for returning students')) {
        return "Monday 29th January, 2024 to Saturday 10th February, 2024";
      } else if (lowerCaseInput.includes('end of registration for both new and old students')) {
        return "Monday 29th January, 2024 to Saturday 10th February, 2024";
      } else if (lowerCaseInput.includes('lecture period for 1st semester 2023/2024 academic session')) {
        return "Monday 19th February, 2024 to Saturday 18th May, 2024";
      } else if (lowerCaseInput.includes('add & drop')) {
        return "Monday 4th March, 2024 to Saturday 16th March, 2024"; 
      } else if (lowerCaseInput.includes('1st semester 2023/2024 examination')) {
        return "Monday 20th May, 2024 to Saturday 8th June, 2024";
      } else if (lowerCaseInput.includes('inter semester break')) {
          return "Monday 10th June, 2024 to Sunday 30th June, 2024";
      } else if (lowerCaseInput.includes('lecture period for 2nd semester 2023/2024 academic session')) {
        return "Monday 1st July, 2024 to Saturday 10th August, 2024"; 
      } else if (lowerCaseInput.includes('mid semester Break')) {
        return "Monday 12th August, 2024 to Saturday 17th August, 2024"; 
      } else if (lowerCaseInput.includes('continuation and end of 2nd semester lecture')) {
        return "Monday 19th August, 2024 to Saturday 26th October, 2024"; 
      } else if (lowerCaseInput.includes('2nd semester 2023/2024 examinations')) {
        return "Monday 7th October, 2024 to Saturday 26th October, 2024";
      } else if (lowerCaseInput.includes('new session begins')) {
        return "Monday 4th November, 2024"; 
      } else if (lowerCaseInput.includes('lecture period for first semester')) {
        return "Monday 19th February, 2024 to Saturday 18th May, 2024";
      } else if (lowerCaseInput.includes('second semester result')) {
        return "The date has not been revealed";
      } else if (lowerCaseInput.includes('cut off mark for computer science')) {
        return "The cut of mark for computer science is 180";
      } else if (lowerCaseInput.includes('school fees')) {
        return "It depend on your course of study";
      } else {
        // Use the Universal Sentence Encoder to get a response
        try {
          const model = await window.embed(
            'https://tfhub.dev/google/universal-sentence-encoder/4'
          );
          const embeddings = await model.embed([userInput]);
          const similarityScore = embeddings
            .dot(tf.tensor([0.1, 0.2, 0.3])) // Replace with your example embedding
            .dataSync()[0];

          // Use a threshold for response selection
          if (similarityScore > 0.7) {
            return "Your example response";
          } else {
            return "I'm not sure how to respond to that.";
          }
        } catch (error) {
          // Handle errors related to the Universal Sentence Encoder
          if (error.message && error.message.includes('Embedding not found')) {
            console.error('Error: Embedding not found');
            return "An error occurred while processing your request. Please try again later.";
          } else {
            console.error('Error in machine learning model:', error);
            return "I dont have such information for now.";
          }
        }
      }
    };

    const renderMessageEle = (txt, type) => {
      let className = "user-message";
      if (type !== "user") {
        className = "chatbot-message";
      }
      const messageEle = document.createElement("div");
      const txtNode = document.createTextNode(txt);
      messageEle.classList.add(className);
      messageEle.append(txtNode);
      chatBody.append(messageEle);
    };

    const setScrollPosition = () => {
      if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    };
