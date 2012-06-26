function (doc) {
	if (doc._id.substr(0,7) === "contact") {
		emit(doc._id, {
			"group": doc.group,
			"flname": doc.flname,
			"addy": doc.addy,
			"user": doc.user,
			"pass": doc.pass,
			"itemName": doc.itemName,
			"serialNum": doc.serialNum
		});
	}
};