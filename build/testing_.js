var ref = new Firebase("https://test-001.firebaseio.com/");
// Retrieve new posts as they are added to our database
ref.on("value", function(snapshot) {
  var newPost = snapshot.val();
  console.log(newPost);
  for(val in newPost) {
  	var obj = newPost[val];
  };
});