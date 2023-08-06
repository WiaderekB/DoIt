"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import RevalidateListPage from "@/functions/revalidateListPage";

export default function QuickAddList() {
	const router = useRouter();

	const [visibleIconPicker, setVisibleIconPicker] = useState<boolean>(false);

	const [selectedEmoji, setSelectedEmoji] = useState<string>("🗒️");
	const [listTitle, setListTitle] = useState<string>("");

	const supabase = createClientComponentClient({});

	async function getUserId(): Promise<string> {
		const {
			data: { session },
		}: any = await supabase.auth.getSession();
		return session.user.id;
	}

	async function insertNewListToDB() {
		const { data }: any = await supabase
			.from("lists")
			.insert([{ user_id: await getUserId(), name: listTitle, icon: selectedEmoji }])
			.select();

		RevalidateListPage();

		router.push(`/app/${data[0].id}`);
	}

	return (
		<>
			<div className=" rounded-lg px-7 py-4 shadow-md outline-dotted outline-2 outline-colorGray/50 md:py-6 2xl:py-9">
				<p className="mb-3 cursor-default text-xl font-normal text-colorGray/70">Quick add new list</p>

				<div className="flex flex-row items-center gap-x-2 sm:gap-x-5">
					{/* Icon display */}
					<div
						onClick={() => setVisibleIconPicker(true)}
						className="sm:text-md m-auto aspect-square cursor-pointer rounded-md bg-colorGray/20 p-2 text-sm transition-all hover:bg-colorGray/30 sm:p-3"
					>
						{selectedEmoji}
					</div>

					{/* Text input */}
					<input
						id="nickname"
						name="nickname"
						type="text"
						maxLength={35}
						value={listTitle}
						placeholder="List title"
						onChange={(e) => setListTitle(e.target.value)}
						className="grow rounded-md border-1 border-colorGray/30 bg-transparent px-3 py-2 text-sm text-[--text-rgb] outline-none hover:border-colorGray/70 md:py-3 md:text-base"
					/>

					<button
						className={`md:text-md truncate rounded-lg px-5 py-2 text-sm font-medium text-white transition-all duration-500 sm:px-7 sm:py-3 ${
							listTitle != "" ? "bg-colorBlue" : "bg-red-700"
						}`}
						disabled={listTitle == ""}
						onClick={() => insertNewListToDB()}
					>
						{listTitle != "" ? "Add list" : "Fill all of the fields!"}
					</button>
				</div>
			</div>

			{/* Icon picker */}
			{visibleIconPicker ? (
				<EmojiPicker
					onEmojiClick={(e) => {
						setVisibleIconPicker(false);
						setSelectedEmoji(e.emoji);
					}}
					autoFocusSearch={false}
					theme={Theme.DARK}
					lazyLoadEmojis={true}
					searchPlaceHolder="Search"
					emojiStyle={EmojiStyle.NATIVE}
				/>
			) : (
				<></>
			)}
		</>
	);
}