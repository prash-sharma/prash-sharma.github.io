let isVerified = true;
let loggedIn = true;
let hasPaymentToken = true;
let isGuest = true;


if (loggedIn && hasPaymentToken && isVerified) {
    console.log("Get in");
} else{
    console.log("Hey visitor");
}