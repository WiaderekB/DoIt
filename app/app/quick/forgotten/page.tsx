import DoLinkTile from "@/components/app/homePage/doLinkTile";
import checkIfPastDate from "@/functions/checkIfPastDate";
import SortAndCompareDos from "@/functions/sortAndCompareDos";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function Page() {
	const supabase = createServerComponentClient({
		cookies,
	});

	let { data: dos }: PostgrestSingleResponse<DataDoType[]> = await supabase.from("dos").select("*");
	let { data: lists }: PostgrestSingleResponse<DataListType[]> = await supabase.from("lists").select("*");

	const dosToShow = dos?.filter((singleDo: DataDoType) => checkIfPastDate(singleDo.due_date) && !singleDo.done).sort((doA, doB) => SortAndCompareDos(doA, doB));

	return (
		<section className="mx-4 mb-10 mt-20 flex flex-col text-[--text-rgb] md:mx-20 md:mb-20 md:mt-28 2xl:mx-36">
			<FontAwesomeIcon icon={faBoxArchive} className="mb-4 h-12 p-1 text-[#df3737] md:mb-8 md:h-20" />

			<h1 className="text-center text-3xl font-extrabold text-[--text-rgb] md:mb-3 md:text-5xl">Forgotten</h1>
			<h3 className="mb-6 text-center text-xl font-normal text-colorGray/70 md:mb-20 md:text-3xl">These are your dos you forgot to do...</h3>

			<div className="mt-5 flex flex-col gap-y-1 md:mt-7">
				{/* Task table title row */}
				<div className="flex flex-row items-center gap-x-1.5 md:gap-x-3">
					<h2 className="-ms-1.5 rounded-md px-1.5 py-0.5 text-base font-bold text-[--text-rgb] md:-ms-3 md:px-3 md:py-1 md:text-xl">Forgotten dos</h2>
					<p className="text-sm font-medium text-colorGray md:text-base">{dosToShow?.filter((singleDo) => !singleDo.done).length}</p>

					{/* Spacer */}
					<div className="grow" />
				</div>

				{/* Spacer */}
				<div className="my-1 h-px w-full bg-colorGray/20" />

				{/* Tasks */}
				<div className="flex flex-col gap-y-1">
					{dosToShow?.map((singleDo) => (
						<DoLinkTile key={singleDo.id} do={singleDo} list={lists!.filter((list) => list.id == singleDo.list)[0]} />
					))}
				</div>
			</div>
		</section>
	);
}
