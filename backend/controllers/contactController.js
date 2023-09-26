const ContactForm = require('../models/contactForm');

// Create a new contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new ContactForm document
    const newContact = new ContactForm({ name, email, subject, message });

    // Save the document to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

// Retrieve a list of all contact form submissions
exports.getAllContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactForm.find(); // Retrieve all documents from the collection

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the contact form submissions' });
  }
};
