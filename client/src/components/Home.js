import React from 'react';
import './Home.css';

export default class Home extends React.Component {

    render() {
        return (
            <div className="home">
            <div className = "container-fluid">
                {/* <div className=""> */}
                <div className = "row text-center home-content">
                    <div className="col-6 home-title">
                        <h1>Welcome to Responsive Pages</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 home-description text-justify">
                        <p>
                            Το CMS της <span>Ordereze</span> έχει την οντότητα <span>ResponsivePages</span>. Πρόκειται ουσιαστικά για σελίδες από τις οποίες απαρτίζεται ένα site.
                            Ο χρήστης μπορεί να διαχειρίζεται τις σελίδες αυτές μέσα από το <span>administration area</span>. 
                        </p>
                        <p>
                            Εκεί μπορεί να <span>δημιουργεί</span> σελίδες, να <span>επεξεργάζεται</span> υπάρχουσες σελίδες και να <span>διαγράφει</span> αυτές που δεν χρειάζονται.
                            Στόχος της άσκησης είναι να δημιουργηθεί ένα απλό και μοντέρνο περιβάλλον διαχείρισης αυτών των σελίδων μέσα από ένα απλό <span>Single Page Application</span>.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right mt-5 home-extra">
                        <p>Περισότερες Πληροφορίες για το Responsive Pages Api μπορείτε να βρείτε στο συνοδευτικό documentation</p>
                        <a className="btn btn-secondary" target="_black" href="http://pagesmanagement.azurewebsites.net/Help">Api Documentation</a>
                    </div>
                </div>
                {/* </div> */}
            </div>
            </div>
        )
    };
};