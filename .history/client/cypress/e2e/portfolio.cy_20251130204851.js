
    describe("Rojina Portfolio E2E Test", () => {
    
        it("Loads the home page and navigates all sections", () => {
          cy.visit("http://localhost:5173"); // or 3000 if that's where your app runs
                
          // HOME SECTION
          cy.contains("Welcome to My Portfolio").should("be.visible");
          cy.screenshot("home-section");
                
          // NAV --> ABOUT
          cy.contains("About Me").click();
          cy.get("#about").should("be.visible");
          cy.contains("Rojina Saberi").should("be.visible");
          cy.screenshot("about-section");
                
          // NAV --> SERVICES
          cy.contains("Services").click();
          cy.get("#services").should("be.visible");
          cy.contains("Technical Support & Helpdesk").should("be.visible");
          cy.screenshot("services-section");
                
          // NAV --> PROJECTS
          cy.contains("Projects").click();
          cy.get("#projects").should("be.visible");
          cy.get(".project-card").should("have.length.at.least", 1);
          cy.screenshot("projects-section");
                
          // NAV --> CONTACT FORM
          cy.contains("Contact").click();
          cy.get("#form").should("be.visible");
                
          cy.get("#fname").type("Test");
          cy.get("#lname").type("User");
          cy.get("#country").select("uk");
          cy.get("#subject").type("Hello! This is an automated E2E test.");
          cy.screenshot("form-filled");
                
          cy.get("button[type='submit']").click();
          cy.contains("Send").should("be.visible");
                
          cy.screenshot("form-submitted");
        });
      });
      
  })
})
