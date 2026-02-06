1 -> In Message controller :-
_getAllContacts controller _:-

.select('-password -email -createdAt -updatedAt -__v')

# Prevents *sensitive data leakage*
# Reduces response *payload size*
# Follows principle of *least privilege*
 
 
