"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get reference to form by ids
    const profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const educationElement = document.getElementById('education');
    const experianceElement = document.getElementById('experiance');
    const skillsElement = document.getElementById('skills');
    const diplomaorcertificatesElement = document.getElementById('diplomaorcertificates');
    const usernameElement = document.getElementById("username");
    // Check if all required form elements exist
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experianceElement && skillsElement && diplomaorcertificatesElement && usernameElement) {
        // Get form data
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experiance = experianceElement.value;
        const skills = skillsElement.value;
        const diplomaorcertificates = diplomaorcertificatesElement.value;
        const username = usernameElement.value;
        const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`;
        // Handle profile picture if provided
        const profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        // Create the resume output HTML
        const resumeOutput = `
      <h2>Resume</h2>
      ${profilePictureFile ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 300px; height: 300px;" />` : ""}
      <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
      <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
      <p><strong>Contact Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

      <h3>Education</h3>
      <p id="edit-education" class="editable">${education}</p>

      <h3>Experience</h3>
      <p id="edit-experiance" class="editable">${experiance}</p>

      <h3>Skills</h3>
      <p id="edit-skills" class="editable">${skills}</p>

      <h3>Diploma or Certificates</h3>
      <p id="edit-diplomaorcertificates" class="editable">${diplomaorcertificates}</p>
    `;
        // Create a download link for the resume
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Resume';
        // Create container for buttons (Download and Shareable Link)
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        // Find the resume output element in the DOM
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");
            // Append the buttons container
            resumeOutputElement.appendChild(buttonsContainer);
            // Add "Download PDF" button (Not functional yet, as you are using HTML for now)
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download PDF"; // Optional: Implement PDF download functionality later
            downloadButton.addEventListener("click", () => {
                window.print(); // This triggers the print dialog
            });
            buttonsContainer.appendChild(downloadButton);
            // Add "Copy Shareable Link" button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Create unique shareable link
                    const shareableLink = `https://yourdomain.com/resume/${username.replace(/\s+/g, "_")}_cv.html`;
                    // Use Clipboard API to copy the link to the clipboard
                    yield navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard");
                }
                catch (err) {
                    console.error("Failed to copy link:", err);
                    alert("Failed to copy link to clipboard. Please try again.");
                }
            }));
            buttonsContainer.appendChild(shareLinkButton);
        }
        else {
            console.error("Resume output container not found");
        }
    }
    else {
        console.error("One or more form elements are missing");
    }
});
// Function to make editable content in the resume
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            var _a;
            const currentElement = element;
            const currentValue = currentElement.textContent || "";
            // Create an input field to replace the current text content
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove(); // Remove the input after editing
                });
                currentElement.style.display = 'none'; // Hide the original element
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
                input.focus(); // Focus the input field
            }
        });
    });
}
