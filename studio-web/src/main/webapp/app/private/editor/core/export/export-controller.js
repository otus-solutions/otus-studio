(function functionName() {
    function turnInJson(workResult) {
        try {
            var Json = Json.parse(workResult);
            return Json;
        } catch (e) {}
    }
}());
