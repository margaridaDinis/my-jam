function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(
    (permissionTheyHave) => permissionsNeeded.includes(permissionTheyHave),
  );
  if (!matchedPermissions.length) {
    throw new Error('You do not have sufficient permissions!');
  }
}

exports.hasPermission = hasPermission;
exports.userEditPermissions = ['ADMIN', 'PERMISSIONUPDATE'];
exports.userAlbumCreatePermissions = ['ALBUMCREATE'];
exports.userAlbumDeletePermissions = ['ALBUMDELETE'];
exports.userAlbumUpdatePermissions = ['ALBUMUPDATE'];
