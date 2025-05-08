export default {
  async fetch(req: Request): Promise<Response> {
    try {
      // 요청 URL에서 bookmarkListId 추출 (쿼리 파라미터로 전달됨)
      const url = new URL(req.url);
      const bookmarkListId = url.searchParams.get("bookmarkListId");

      console.log("Bookmark List ID:", bookmarkListId);

      if (!bookmarkListId) {
        return new Response(
          JSON.stringify({ error: "bookmarkListId is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const apiUrl = `https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/${bookmarkListId}/bookmarks?placeInfo=true&start=0&limit=20&sort=lastUseTime&createIdNo=true`;

      // API 요청
      const apiResponse = await fetch(apiUrl, {
        method: "GET",
      });

      if (!apiResponse.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await apiResponse.json();
      const bookmarkList = data.bookmarkList.map((b: any) => b.sid);

      // JSON 형식으로 데이터 반환
      return new Response(JSON.stringify({ bookmarkList }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // 오류 발생 시 500 응답 반환
      console.error(error);
      return new Response(
        JSON.stringify({
          errorMessage: "Error fetching data",
          error: JSON.stringify(error, null, 2),
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
} satisfies ExportedHandler;
